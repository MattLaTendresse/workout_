'use client';

import { useState } from 'react';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

interface Workout {
  id: number;
  day: string;
  exercises: Exercise[];
}

type WorkoutSplit = '3-day' | '4-day' | '5-day';

const workoutPlans: Record<WorkoutSplit, Workout[]> = {
  '3-day': [
    {
      id: 1,
      day: 'Monday',
      exercises: [
        { id: 1, name: 'Squats', sets: 3, reps: 10 },
        { id: 2, name: 'Bench Press', sets: 3, reps: 8 },
        { id: 3, name: 'Deadlift', sets: 3, reps: 5 },
      ],
    },
    {
      id: 2,
      day: 'Wednesday',
      exercises: [
        { id: 4, name: 'Overhead Press', sets: 3, reps: 8 },
        { id: 5, name: 'Pull-ups', sets: 3, reps: 10 },
        { id: 6, name: 'Barbell Rows', sets: 3, reps: 8 },
      ],
    },
    {
      id: 3,
      day: 'Friday',
      exercises: [
        { id: 7, name: 'Lunges', sets: 3, reps: 12 },
        { id: 8, name: 'Bicep Curls', sets: 3, reps: 12 },
        { id: 9, name: 'Tricep Dips', sets: 3, reps: 12 },
      ],
    },
  ],
  '4-day': [
    {
      id: 1,
      day: 'Monday',
      exercises: [
        { id: 1, name: 'Squats', sets: 4, reps: 8 },
        { id: 2, name: 'Leg Press', sets: 3, reps: 12 },
        { id: 3, name: 'Leg Curls', sets: 3, reps: 12 },
      ],
    },
    {
      id: 2,
      day: 'Tuesday',
      exercises: [
        { id: 4, name: 'Bench Press', sets: 4, reps: 8 },
        { id: 5, name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
        { id: 6, name: 'Chest Flyes', sets: 3, reps: 12 },
      ],
    },
    {
      id: 3,
      day: 'Thursday',
      exercises: [
        { id: 7, name: 'Deadlift', sets: 4, reps: 5 },
        { id: 8, name: 'Pull-ups', sets: 3, reps: 10 },
        { id: 9, name: 'Barbell Rows', sets: 3, reps: 8 },
      ],
    },
    {
      id: 4,
      day: 'Friday',
      exercises: [
        { id: 10, name: 'Overhead Press', sets: 4, reps: 8 },
        { id: 11, name: 'Lateral Raises', sets: 3, reps: 12 },
        { id: 12, name: 'Face Pulls', sets: 3, reps: 15 },
      ],
    },
  ],
  '5-day': [
    {
      id: 1,
      day: 'Monday',
      exercises: [
        { id: 1, name: 'Squats', sets: 5, reps: 5 },
        { id: 2, name: 'Leg Press', sets: 4, reps: 10 },
        { id: 3, name: 'Calf Raises', sets: 4, reps: 15 },
      ],
    },
    {
      id: 2,
      day: 'Tuesday',
      exercises: [
        { id: 4, name: 'Bench Press', sets: 5, reps: 5 },
        { id: 5, name: 'Dumbbell Flyes', sets: 3, reps: 12 },
        { id: 6, name: 'Push-ups', sets: 3, reps: 15 },
      ],
    },
    {
      id: 3,
      day: 'Wednesday',
      exercises: [
        { id: 7, name: 'Deadlift', sets: 5, reps: 3 },
        { id: 8, name: 'Lat Pulldowns', sets: 4, reps: 10 },
        { id: 9, name: 'Seated Rows', sets: 4, reps: 10 },
      ],
    },
    {
      id: 4,
      day: 'Thursday',
      exercises: [
        { id: 10, name: 'Overhead Press', sets: 5, reps: 5 },
        { id: 11, name: 'Arnold Press', sets: 3, reps: 12 },
        { id: 12, name: 'Shrugs', sets: 3, reps: 15 },
      ],
    },
    {
      id: 5,
      day: 'Friday',
      exercises: [
        { id: 13, name: 'Barbell Curls', sets: 4, reps: 10 },
        { id: 14, name: 'Tricep Pushdowns', sets: 4, reps: 10 },
        { id: 15, name: 'Hammer Curls', sets: 3, reps: 12 },
      ],
    },
  ],
};

export default function Home() {
  const [selectedSplit, setSelectedSplit] = useState<WorkoutSplit | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<Workout[]>([]);
  const [trackedWorkouts, setTrackedWorkouts] = useState<Workout[]>([]);

  const handleSplitSelection = (split: WorkoutSplit) => {
    setSelectedSplit(split);
    setWorkoutPlan(workoutPlans[split]);
  };

  const handleWeightChange = (workoutId: number, exerciseId: number, weight: number) => {
    const updatedWorkoutPlan = workoutPlan.map((workout) => {
      if (workout.id === workoutId) {
        const updatedExercises = workout.exercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            return { ...exercise, weight };
          }
          return exercise;
        });
        return { ...workout, exercises: updatedExercises };
      }
      return workout;
    });
    setWorkoutPlan(updatedWorkoutPlan);
  };

  const handleTrackWorkout = (workoutId: number) => {
    const workoutToTrack = workoutPlan.find((workout) => workout.id === workoutId);
    if (workoutToTrack) {
      setTrackedWorkouts([...trackedWorkouts, workoutToTrack]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center text-2xl font-bold mb-4">
        <h1>Workout Tracker</h1>
      </header>
      <main>
        {!selectedSplit ? (
          <section className="text-center">
            <h2 className="text-xl font-semibold mb-4">Choose Your Workout Split</h2>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
                onClick={() => handleSplitSelection('3-day')}
              >
                3-Day Split
              </button>
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg"
                onClick={() => handleSplitSelection('4-day')}
              >
                4-Day Split
              </button>
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg"
                onClick={() => handleSplitSelection('5-day')}
              >
                5-Day Split
              </button>
            </div>
          </section>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Today's Workout</h2>
              {workoutPlan.map((workout) => (
                <div key={workout.id} className="mb-4 p-4 border rounded">
                  <h3 className="text-lg font-semibold">{workout.day}</h3>
                  <ul>
                    {workout.exercises.map((exercise) => (
                      <li key={exercise.id} className="flex justify-between items-center mb-2">
                        <span>
                          {exercise.name}: {exercise.sets} sets of {exercise.reps} reps
                        </span>
                        <input
                          type="number"
                          placeholder="Weight"
                          className="p-1 border rounded w-24"
                          onChange={(e) =>
                            handleWeightChange(workout.id, exercise.id, parseInt(e.target.value))
                          }
                        />
                      </li>
                    ))}
                  </ul>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    onClick={() => handleTrackWorkout(workout.id)}
                  >
                    Track Workout
                  </button>
                </div>
              ))}
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Progress</h2>
              {trackedWorkouts.length > 0 ? (
                <ul>
                  {trackedWorkouts.map((workout) => (
                    <li key={workout.id} className="mb-2 p-2 border rounded">
                      <h3 className="font-semibold">{workout.day}</h3>
                      <ul>
                        {workout.exercises.map((exercise) => (
                          <li key={exercise.id}>
                            {exercise.name}: {exercise.weight || 'N/A'} lbs
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No workouts tracked yet.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}