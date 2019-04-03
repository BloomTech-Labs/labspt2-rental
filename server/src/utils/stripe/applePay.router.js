import { Router, path } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const file = path.join(
    __dirname,
    '/apple-developer-merchantid-domain-association.dms'
  );
  res.download(file);
});

export default router;
