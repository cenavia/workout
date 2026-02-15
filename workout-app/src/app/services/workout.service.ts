import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Workout, CreateWorkoutDto, UpdateWorkoutDto } from '@models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = `${environment.API_URL}/api/v1/workouts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.apiUrl);
  }

  getById(id: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrl}/${id}`);
  }

  create(workout: CreateWorkoutDto): Observable<Workout> {
    return this.http.post<Workout>(this.apiUrl, workout);
  }

  update(id: string, workout: UpdateWorkoutDto): Observable<Workout> {
    return this.http.put<Workout>(`${this.apiUrl}/${id}`, workout);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getWorkoutsByUser(userId: string): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrl}/user/${userId}`);
  }
}
