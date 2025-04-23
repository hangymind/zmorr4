import "./scss/main.scss";
import { Game } from "./scripts/game";
import { UI } from "@/ui.ts";
import { Settings } from "@/settings.ts";

export class ClientApplication {
    settings = new Settings(this);
    ui = new UI(this);
    game = new Game(this);

    async init() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'grid';
        }

        await this.game.init();
    }
}

void new ClientApplication().init();
