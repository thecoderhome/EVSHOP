import Order from '@/models/Order';
import db from '@/utils/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }
  const { user } = session;
  console.log(user);
  await db.connect();
  const orders = await Order.find({ user: user._id });
  await db.disconnect();
  console.log(orders);
  res.send(orders);
};

export default handler;
