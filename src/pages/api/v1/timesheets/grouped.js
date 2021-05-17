import createHandler from '@middleware/createHandler';
import { fetchAll } from '@utilities/db-utils';

const apiRoute = createHandler();

apiRoute.get(fetchAll('timesheets'))

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};