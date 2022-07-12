import { validation } from "./modules/validation";
import { gameOver } from "./modules/gameOver";
import { quiz } from "./modules/quiz";
import { leaderboard } from "./modules/leaderboard";
import "../css/index.css";
import { gameMode } from "./modules/gameMode";
import { timer } from "./modules/timer";
import { modal } from "./modules/gameRulesModal";

quiz();
validation();
gameOver();
leaderboard();
gameMode();
timer();
modal()
