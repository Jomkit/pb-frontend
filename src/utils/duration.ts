// Simple utility for handling ISO-8601 durations
import { Duration } from "luxon";

/**
 * Get total duration from a list of ISO 8601 durations
 * 
 * @params {string[]} durations - A list of ISO 8601 durations
 * @returns {Duration} - A luxon Duration object
 */
const calculateTotalDuration = (durations: string[]) => {
    if(!durations) return Duration.fromMillis(0);
    return durations.reduce((acc: Duration, curr: string) => acc.plus(Duration.fromISO(curr)), Duration.fromMillis(0));
}

export { calculateTotalDuration }