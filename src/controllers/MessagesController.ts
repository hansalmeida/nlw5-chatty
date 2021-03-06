import { Request, Response } from "express"
import { MessagesService } from "../services/MessagesService"

export class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, text, user_id } = request.body

    const messageService = new MessagesService()

    const message = await messageService.create({
      admin_id,
      text,
      user_id,
    })

    return response.json(message)
  }

  async listByUserId(request: Request, response: Response) {
    const { id } = request.params

    const messageService = new MessagesService()

    const messageList = await messageService.listByUserId(id)

    return response.json(messageList)
  }
}
