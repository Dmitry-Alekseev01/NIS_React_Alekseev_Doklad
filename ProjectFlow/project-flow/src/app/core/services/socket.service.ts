import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.wsUrl, { transports: ['websocket'] });
  }

  onProjectUpdate(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('projectUpdated', data => observer.next(data));
    });
  }

  onTaskUpdate(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('taskUpdated', data => observer.next(data));
    });
  }

  emitTaskUpdate(taskId: number, changes: any): void {
    this.socket.emit('taskUpdated', { taskId, changes });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }
}