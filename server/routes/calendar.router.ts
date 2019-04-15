import { Router } from "express";
import { CalendarController } from "../controllers/calendar.controller";

class CalendarRouter {
    public router: Router;
    private calendarController: CalendarController = new CalendarController();

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.post("/court-case", this.calendarController.addCourtCase);
    }
}

const calendarRouter = new CalendarRouter();
export default calendarRouter.router;