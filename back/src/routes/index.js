
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import authRouter from './auth.router.js'
import assoRouter from './asso.router.js'
import restoRouter from './resto.router.js';
import reservation from './reservation.router.js';
// import CguRouter from './Cgu.router.js';
import { verify } from 'hono/jwt'
import authService from '../services/auth.service.js'
import env from '../config/env.js'
import { authGuard } from '../middlewares/authguard.js'


const app = new Hono()


app.get('/', (c) => c.text('Hello from Hono!'))


// Ajouter un groupe de routes
app.route('/api', authRouter);
app.route("/api/asso", assoRouter);
app.route("/api/resto", restoRouter);
app.route("/api/reservation", reservation);

// console.log("Routes chargées :");
// console.log(app.routes);

// app.route("/api/Cgu", CguRouter);

app.get(
  '/authenticated',
  authGuard(),
  (c) => {
    const user = c.get('user')
    return c.text('Authenticated route, hi ' + user.email)
  }
)

export default app;