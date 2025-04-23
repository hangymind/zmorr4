import { ClientEntity } from "./clientEntity";
import { EntityType } from "@common/constants";
import { GameSprite, getGameAssetsPath } from "@/scripts/utils/pixi";
import { Game } from "@/scripts/game";
import { EntitiesNetData } from "@common/packets/updatePacket.ts";
import { Camera } from "@/scripts/render/camera.ts";
import { Vec2 } from "@common/utils/vector.ts";
import { Tween } from '@tweenjs/tween.js';
import { PetalDefinition } from "@common/definitions/petal.ts";
import { EasingFunctions, MathGraphics } from "@common/utils/math.ts";
import { Rarity } from "@common/definitions/rarity.ts";
import { Color } from "pixi.js";
import { Random } from "@common/utils/random.ts";

export class ClientPetal extends ClientEntity {
    type = EntityType.Petal;

    images = {
        body: new GameSprite()
    };

    angle: number = 0;
    ownerId: number = -1;

    definition?: PetalDefinition;

    reloadAnimation?: Tween;

    visible: boolean = true;

    constructor(game: Game, id: number) {
        super(game, id);

        this.container.zIndex = 1;

        this.images.body.anchor.set(0.5);

        this.container.addChild(
            this.images.body
        );
    }

    render(dt: number): void {
        super.render(dt);

        if (this.definition) {
            const owner = this.game.entityPool.get(this.ownerId);

            if (this.definition.equipment) {
                if (owner) {
                    this.container.position = Vec2.sub(
                        owner.container.position,
                        Vec2.new(0, 25)
                    );
                }
                this.container.zIndex = 3;
                return;
            }

            if (this.definition.images?.facingOut) {
                if (owner) {
                    this.images.body.setRotation(
                        Vec2.directionToRadians(
                            MathGraphics.directionBetweenPoints(this.position, owner.position)
                        )
                    )
                }
            } else if (this.definition.images?.selfGameRotation) {
                this.angle += this.definition.images.selfGameRotation;
                this.images.body.setAngle(this.angle);
            }

            if (Rarity.fromString(this.definition.rarity).showParticle && this.visible) {
                this.game.particleManager.spawnParticle({
                    position: this.container.position,
                    sprite: getGameAssetsPath("petal", "light"),
                    speed: { min: 0, max: 150 },
                    direction: { min: -6.28, max: 6.28 },
                    alpha: { min: 0, max: 0.5 },
                    lifeTime: { min: 0, max: 0.25 },
                    scale: { min: 0.01, max: 0.04 },
                    rotation: { value: 0 }
                })
            }
        }

        if (this.reloadAnimation) {
            this.reloadAnimation.update();
        } else {
            this.updateContainerPosition(10);
        }
    }

    changeVisibleTo(visible: boolean): void {
        if (!this.definition) return;
        if (this.visible !== visible) {
            this.visible = visible;
            if (visible || this.definition.equipment) {
                this.reloadAnimation = undefined;
                this.images.body.setFrame(getGameAssetsPath("petal", this.definition))
                this.images.body.setVisible(visible);
                this.images.body.setAlpha(1);
                this.images.body.setScaleByUnitRadius(this.definition.hitboxRadius);
            } else {
                this.reloadAnimation = new Tween({ alpha: 1, scale: this.definition.hitboxRadius })
                    .to({ alpha: 0, scale: this.definition.hitboxRadius * 3 }
                        , Math.min(200, this.definition.reloadTime ? this.definition.reloadTime * 1000 : 100))
                    .easing(EasingFunctions.sineOut)
                    .onUpdate((obj) => {
                        this.images.body.alpha = obj.alpha;
                        this.images.body.setScaleByUnitRadius(obj.scale);
                    }).onComplete(() => {
                        this.images.body.setVisible(visible)
                        this.reloadAnimation = undefined;
                    }).start()
            }
        }
    }

    updateFromData(data: EntitiesNetData[EntityType.Petal], isNew: boolean): void {
        this.position = data.position;

        this.definition = data.definition;

        if (isNew){
            this.container.position = Camera.vecToScreen(this.position);

            this.images.body
                .setFrame(getGameAssetsPath("petal", this.definition))
                .setScaleByUnitRadius(data.definition.hitboxRadius)
                .setVisible(!data.isReloading);
        }

        if (data.gotDamage) {
            this.getDamageAnimation(true);
        }

        this.ownerId = data.ownerId;

        this.changeVisibleTo(!data.isReloading);

        super.updateFromData(data, isNew);
    }
}
