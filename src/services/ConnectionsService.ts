import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection"
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"

interface IConnectionCreate {
  socket_id: string
  user_id: string
  admin_id?: string
  id?: string
}

export class ConnectionsService {
  constructor(
    private connectionsRepository: Repository<Connection> = getCustomRepository(
      ConnectionsRepository
    )
  ) {}

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    })

    await this.connectionsRepository.save(connection)

    return connection
  }
}