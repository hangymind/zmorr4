import { ClientEntity } from "./clientEntity";
import { EntityType, GameConstants } from "@common/constants";
import { GameSprite, getGameAssetsPath } from "@/scripts/utils/pixi";
import { Game } from "@/scripts/game";
import { EntitiesNetData } from "@common/packets/updatePacket.ts";
import { Camera } from "@/scripts/render/camera.ts";
import { Text, Graphics, ColorMatrixFilter, Container } from "pixi.js";
import { EasingFunctions, MathGraphics, MathNumeric } from "@common/utils/math.ts";
import { MobDefinition } from "@common/definitions/mob.ts";
import { Vec2, Vector } from "@common/utils/vector.ts";
import { Rarity } from "@common/definitions/rarity.ts";
import { Tween } from '@tweenjs/tween.js';

const defaultImageSize = 200;

export class ClientMob extends ClientEntity {
    // 新增属性，用于存储屏幕上方的血条
    screenTopHealthBar: Graphics | null = null;

    type = EntityType.Mob;

    images = {
        body: new GameSprite(),
        left_mouth: new GameSprite(),
        right_mouth: new GameSprite(),
        leg1: new GameSprite(),
        leg2: new GameSprite(),
        leg3: new GameSprite(),
        leg4: new GameSprite(),
    };

    healthPercent = 1;
    healthBar = new Graphics();
    name: Text;
    rarity: Text;

    definition?: MobDefinition;

    lastGettingDamage: number = 0;

    constructor(game: Game, id: number) {
        super(game, id);

        this.container.zIndex = 0;

        this.images.body.anchor.set(0.5);

        this.healthBar.position.set(0, 50);

        this.name = new Text({
            text: "",
            style: {
                fontFamily: 'Ubuntu',
                fontSize: 11,
                fill: "#fff",
                stroke: {color: "#000", width: 2}
            }
        });

        this.rarity = new Text({
            text: "",
            style: {
                fontFamily: 'Ubuntu',
                fontSize: 11,
                fill: "#fff",
                stroke: {color: "#000", width: 2}
            }
        });

        this.name.anchor.y = 0.5;
        this.rarity.anchor.x = 1;


        this.staticContainer.addChild(
            this.name,
            this.healthBar,
            this.rarity
        )

        this.container.addChild(
            this.images.body,
        );
    }

    render(dt: number): void {
        super.render(dt);

        this.updateContainerPosition(8);

        const movementDistance = Vec2.distance(this.oldPosition, this.position);
        if (movementDistance) {
            this.playMovementAnimation(movementDistance)
        }

        this.container.rotation =
            Vec2.directionToRadians(Vec2.targetEasing(Vec2.radiansToDirection(this.container.rotation), this.direction, 6));
    }

    updateFromData(data: EntitiesNetData[EntityType.Mob], isNew: boolean): void {
        this.position = data.position;
        this.direction = data.direction;
        this.definition = data.definition;

        const radius = MathNumeric.clamp(
            Camera.unitToScreen(this.definition.hitboxRadius) * 2,
            80,
            Infinity
        );

        if (isNew) {
            this.container.position = Camera.vecToScreen(this.position);

            this.images.body
                .setFrame(getGameAssetsPath("mob", this.definition));

            this.container.rotation = Vec2.directionToRadians(data.direction);

            const healthBarY = Camera.unitToScreen(this.definition.hitboxRadius + 5 / 20);
            this.healthBar.position.set(0, healthBarY);
            this.name.position.y = healthBarY - 7;
            this.rarity.position.y = healthBarY + 7;

            if (this.definition.images?.width) {
                this.images.body.anchor.x = 0.5 + (
                    (defaultImageSize - this.definition.images.width) / defaultImageSize
                ) / 2;
            }

            if (this.definition.images?.height) {
                this.images.body.anchor.y = 0.5 + (
                    (defaultImageSize - this.definition.images.height) / defaultImageSize
                ) / 2;
            }

            this.init();
        } else {
            if (data.full) {
                if (this.healthPercent > data.full.healthPercent) {
                    this.getDamageAnimation();
                    // 玩家攻击生物，血量减少，复制血条到屏幕上方
                    this.copyHealthBarToScreenTop(radius);
                }
            }
        }

        if (data.full) {
            this.healthPercent = data.full.healthPercent;

            this.drawHealthBar(radius);
            if (this.screenTopHealthBar) {
                this.drawScreenTopHealthBar(radius);
            }
        }

        super.updateFromData(data, isNew);
    }

    // 复制血条到屏幕上方的方法
    copyHealthBarToScreenTop(width: number): void {
        if (!this.screenTopHealthBar) {
            this.screenTopHealthBar = new Graphics();
            this.game.stage.addChild(this.screenTopHealthBar);
        }
        this.drawScreenTopHealthBar(width);
    }

    // 绘制屏幕上方血条的方法
    drawScreenTopHealthBar(width: number): void {
        if (!this.screenTopHealthBar) return;

        const healthbarWidth = width;
        const fillWidth = healthbarWidth * this.healthPercent;

        this.screenTopHealthBar.clear()
            .roundRect((-healthbarWidth - 5) / 2, 20, healthbarWidth + 5, 10)
            .fill({
                color: 0x000000,
                alpha: 0.3
            })
            .roundRect(-healthbarWidth / 2, 20 + 3 / 2, fillWidth, 7)
            .fill({
                color: 0x87e63e
            });
    }

    init(): void {
        if (!this.definition) return;

        const hitboxRadius = this.definition.hitboxRadius;

        if (this.definition.images?.mouth) {
            this.container.addChild(
                this.images.left_mouth,
                this.images.right_mouth
            )

            this.images.left_mouth
                .setFrame(getGameAssetsPath("animation", this.definition))
                .setZIndex(-1)
                .setAnchor(Vec2.new(0, 0.5));
            this.images.right_mouth
                .setFrame(getGameAssetsPath("animation", this.definition))
                .setZIndex(-1)
                .setAnchor(Vec2.new(0, 0.5));
            this.images.right_mouth.scale.y = -1;

            this.images.right_mouth.position.x = Camera.unitToScreen(hitboxRadius) * (this.definition.images?.mouthXPosition ?? 0.6 * 1.5 / hitboxRadius);
            this.images.right_mouth.position.y = Camera.unitToScreen(hitboxRadius) * (this.definition.images?.mouthYPosition ?? 0.9 * 1.5 / hitboxRadius);

            this.images.left_mouth.position.x = Camera.unitToScreen(hitboxRadius) * (this.definition.images?.mouthXPosition ?? 0.6 * 1.5 / hitboxRadius);
            this.images.left_mouth.position.y = Camera.unitToScreen(-hitboxRadius) * (this.definition.images?.mouthYPosition ?? 0.9 * 1.5 / hitboxRadius);
        }

        if (this.definition.images?.spiderLeg) {
            this.container.addChild(
                this.images.leg1,
                this.images.leg2,
                this.images.leg3,
                this.images.leg4
            )

            this.images.leg1
                .setFrame(getGameAssetsPath("animation", "spider_leg1"))
                .setZIndex(-1)
                .setAnchor(Vec2.new(0.5, 0.5));
            this.images.leg2
                .setFrame(getGameAssetsPath("animation", "spider_leg2"))
                .setZIndex(-1)
                .setAnchor(Vec2.new(0.5, 0.5));
            this.images.leg3
                .setFrame(getGameAssetsPath("animation", "spider_leg3"))
                .setZIndex(-1)
                .setAnchor(Vec2.new(0.5, 0.5));
            this.images.leg4
                .setFrame(getGameAssetsPath("animation", "spider_leg4"))
                .setZIndex(-1)
                .setAnchor(Vec2.new(0.5, 0.5));
        }

        this.container.scale = GameSprite.getScaleByUnitRadius(hitboxRadius);

        if (this.definition.hideInformation) {
            this.name.visible = false;
            this.rarity.visible = false;
        }

        this.name.text = this.definition.displayName;
        const rarity = Rarity.fromString(this.definition.rarity);
        this.rarity.text = rarity.displayName;
        this.rarity.style.fill = rarity.color;
    }

    lastMovementAnimation: number = 0;
    lastMovementAnimationTime: number = 0;

    playMovementAnimation(size: number): void {
        if (!this.definition) return;
        if (Date.now() - this.lastMovementAnimation < this.lastMovementAnimationTime * 2) return;
        let time = 150;

        this.lastMovementAnimation = Date.now();
        if (this.definition.images?.mouth) {
            time =
                MathNumeric.remap(size, 0, 0.3, 500, 150);
            this.game.addTween(new Tween({angle: 0})
                .to({angle: 8}, time)
                .onUpdate((d) => {
                    this.images.left_mouth.angle = d.angle;
                    this.images.right_mouth.angle = -d.angle;
                })
            )

            this.game.addTween(new Tween({angle: 8})
                .delay(time)
                .to({angle: 0}, time)
                .onUpdate((d) => {
                    this.images.left_mouth.angle = d.angle;
                    this.images.right_mouth.angle = -d.angle;
                })
            )
        }

        if (this.definition.images?.spiderLeg) {
            time =
                MathNumeric.remap(size, 0, 0.3, 600, 160);
            this.game.addTween(new Tween({angle: 0})
                .to({ angle: 20 }, time)
                .onUpdate((d) => {
                    this.images.leg1.angle = -d.angle / 1.8;
                    this.images.leg2.angle = d.angle;
                    this.images.leg3.angle = d.angle / 2;
                    this.images.leg4.angle = -d.angle / 1.2;
                })
            )

            this.game.addTween(new Tween({angle: 20 })
                .delay(time)
                .to({angle: 0}, time)
                .onUpdate((d) => {
                    this.images.leg1.angle = -d.angle / 1.8;
                    this.images.leg2.angle = d.angle;
                    this.images.leg3.angle = d.angle / 2;
                    this.images.leg4.angle = -d.angle / 1.2;
                })
            )
        }

        this.lastMovementAnimationTime = time;
    }

    drawHealthBar(width: number): void {
        const healthbarWidth = width;
        const fillWidth = healthbarWidth * this.healthPercent;

        if (this.definition && this.definition.hideInformation) this.healthBar.visible = this.healthPercent < 0.999;

        this.healthBar.clear()
            .roundRect((-healthbarWidth - 5) / 2, 0, healthbarWidth + 5, 10)
            .fill({
                color: 0x000000,
                alpha: 0.3
            })
            .roundRect(-healthbarWidth / 2, 3 / 2, fillWidth, 7)
            .fill({
                color: 0x87e63e
            });

        this.name.position.x = -healthbarWidth / 2;
        this.rarity.position.x = (healthbarWidth + 5) / 2;
    }

    destroy() {
        if (this.screenTopHealthBar) {
            this.screenTopHealthBar.destroy();
            this.screenTopHealthBar = null;
        }
        this.game.addTween(new Tween({ scale: this.container.scale.x, alpha: 1 },)
            .to({ scale: this.container.scale.x * 3, alpha: 0 }, 100 )
            .onUpdate(d => {
                this.container.scale.set(d.scale);
                this.container.alpha = d.alpha;
            })
            , super.destroy.bind(this)
        )
    }
}
