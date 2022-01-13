import { Router } from "express";
import { container } from "tsyringe";
import { PodcastController } from "../controller/PodcastController";
import { IConnection } from "../data/connection/IConnection";

const PodcastRoutes = Router();

const podcastController = container.resolve(PodcastController);

PodcastRoutes.get('', (req,res) => podcastController.getPodcast(req,res));
PodcastRoutes.post('/:ytId',(req,res) => podcastController.createPodcast(req,res));

export { PodcastRoutes };