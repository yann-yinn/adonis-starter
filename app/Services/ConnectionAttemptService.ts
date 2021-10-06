import NodeCache from "node-cache";
import {DateTime} from "luxon";
import ConnectionAttemptLimit from "Config/connectionAttemptLimit";
import ConnectionAttemptException from "App/Exceptions/ConnectionAttemptException";
import {RequestContract} from "@ioc:Adonis/Core/Request";
import ConnectionAttemptServiceInterface from "Contracts/interfaces/connectionAttemptServiceInterface";

interface ConnectionAttemptInterface {
  date: DateTime
}

export default class ConnectionAttemptService implements ConnectionAttemptServiceInterface {
  private cache: NodeCache;
  constructor() {
    this.cache = new NodeCache();
  }

  attempt(request: RequestContract) {
    const connectionAttempt: [ConnectionAttemptInterface] = [{date: DateTime.now()}]
    var allConnectionAttempts;
    if (this.cache.has(request.ip()+request.url(false))) {
      const connectionAttempts: [ConnectionAttemptInterface] | undefined = this.cache.get<[ConnectionAttemptInterface]>(request.ip() + request.url(false));
      if (connectionAttempts) {
        allConnectionAttempts = connectionAttempt.concat(connectionAttempts);
      } else {
        allConnectionAttempts = connectionAttempt;
      }
    } else {
      allConnectionAttempts = connectionAttempt;
    }
    this.cache.set<[ConnectionAttemptInterface]>(request.ip()+request.url(false), allConnectionAttempts)
  }

  success(request: RequestContract) {
    this.cache.del(request.ip()+request.url(false));
  }

  check(request: RequestContract) {
    var connectionAttempts: ConnectionAttemptInterface[] | undefined = this.cache.get<ConnectionAttemptInterface[]>(request.ip()+request.url(false));
    if (connectionAttempts) {
      connectionAttempts.forEach(function(connectionAttempt: ConnectionAttemptInterface, key) {
        if (connectionAttempt.date < DateTime.now().minus({hours: ConnectionAttemptLimit.periodInHours})) {
          if (connectionAttempts) {
            delete connectionAttempts[key];
          }
        }
      });
      connectionAttempts = connectionAttempts.filter((element) => {
        return element !== null
      })
    }
    if (connectionAttempts?.length && connectionAttempts.length >= ConnectionAttemptLimit.maxAttempts) {
      throw new ConnectionAttemptException();
    }
  }
}
