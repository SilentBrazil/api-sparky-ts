import { Router } from "express";
import { container } from "tsyringe";
import { VideoController } from "../controller/VideoController";
import { IConnection } from "../data/connection/IConnection";

const VideoRoutes = Router();

const videoController = container.resolve(VideoController);

VideoRoutes.post('/:ytId', (req,res) => videoController.createVideos(req,res));

export { VideoRoutes };