import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate {
  chat: boolean
  username: string
}

export class SettingsService {
  constructor(
    private settingsRepository: Repository<Setting> = getCustomRepository(
      SettingsRepository
    )
  ) {}

  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    })
    if (userAlreadyExists) throw new Error("User already exists")

    const settings = this.settingsRepository.create({
      chat,
      username,
    })

    await this.settingsRepository.save(settings)

    return settings
  }

  async findByUsername(username: string) {
    const settings = await this.settingsRepository.findOne({ username })
  }

  async update(username: string, chat: boolean) {
    const settings = await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", {
        username,
      })
      .execute()
  }
}
