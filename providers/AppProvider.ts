import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import ConnectionAttemptService from "App/Services/ConnectionAttemptService";

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    this.app.container.singleton('App/ConnectionAttemptService',() => {
      return new ConnectionAttemptService();
    });
  }

  public async boot () {

  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
