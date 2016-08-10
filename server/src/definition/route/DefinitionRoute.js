import { Router } from 'express';
import { definitionService } from 'definition/service/DefinitionService';
import { ensureAuthenticated } from 'auth/middleware/AuthMiddleware.js';

const router = new Router();

router.post('/', ensureAuthenticated, (req, res) => {
  definitionService.addDefinition(req.body)
        .then(model => res.json(model))
        .catch(err => {
          res.status(500).send(err);
        });
});

router.get('/:lang/:word', (req, res) => {
  definitionService.getDefinitionBySpelling(req.params.lang, req.params.word)
        .then(model => res.json(model))
        .catch(err => {
          res.status(404).send(err);
        });
});

export default router;
