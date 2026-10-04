import type { Problem, TestCase, Track } from '~/types/content';
import { problems } from '~/data/problems';
import { tracks } from '~/data/tracks';

const trackById = new Map(tracks.map((track) => [track.id, track]));
const problemBySlug = new Map(problems.map((problem) => [problem.slug, problem]));

export function listTracks(): Array<Track> {
  return [...tracks].sort((a, b) => a.order - b.order);
}

export function getTrack(id: string): Track | undefined {
  return trackById.get(id);
}

export function getProblem(slug: string): Problem | undefined {
  return problemBySlug.get(slug);
}

export function listAllProblems(): Array<Problem> {
  return [...problems].sort((a, b) => a.order - b.order);
}

export function listProblemsByTrack(trackId: string): Array<Problem> {
  const track = trackById.get(trackId);
  if (!track) {
    return [];
  }

  return track.problemSlugs
    .map((slug) => problemBySlug.get(slug))
    .filter((problem): problem is Problem => Boolean(problem));
}

export function getAdjacentProblems(slug: string): { next?: Problem; prev?: Problem } {
  const problem = problemBySlug.get(slug);
  if (!problem) {
    return {};
  }

  const siblings = listProblemsByTrack(problem.trackId);
  const index = siblings.findIndex((item) => item.slug === slug);

  return {
    prev: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined,
  };
}

export function getSampleCases(problem: Problem): Array<TestCase> {
  return problem.testCases.filter((testCase) => !testCase.hidden);
}

export function getHiddenCases(problem: Problem): Array<TestCase> {
  return problem.testCases.filter((testCase) => testCase.hidden);
}
