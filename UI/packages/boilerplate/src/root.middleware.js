import { middlewares, chiefMiddleware, fetchMiddleware } from "core";
import { alertingSuccessMiddleware } from "notifications";
import { alertingFailureMiddleware } from "notifications";

import labelStorage from "./labels/label-storage";

middlewares.add(fetchMiddleware(fetch));

middlewares.add(alertingSuccessMiddleware({ labels: labelStorage }));
middlewares.add(alertingFailureMiddleware({ labels: labelStorage }));

export default chiefMiddleware(store => middlewares.sequence(store));
