import { Router } from "express";
import { PodcastController } from "../../controller/PodcastController";

const PodcastRoutes = Router();

PodcastRoutes.post('/:ytId', PodcastController.createPodcast);

export { PodcastRoutes };