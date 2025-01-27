import { memorizedBugsSelector, memorizedBugsByUserSelector, BugState, unresolvedBugsSelector } from '../store/entities/bugs';

describe('bugs selectors', () => {
    const mockState = {
        entities: {
            bugs: {
                list: [
                    { id: '1', resolved: false, userId: 1 },
                    { id: '2', resolved: true, userId: 2 },
                    { id: '3', resolved: false, userId: 1 }
                ],
                loading: false,
                lastFetch: 0
            }
        }
    };

    it('should filter unresolved bugs', () => {
        const result = unresolvedBugsSelector(mockState as BugState);
        expect(result).toHaveLength(2);
    });

    it('should filter bugs by user', () => {
        const selector = memorizedBugsByUserSelector(1)(mockState as BugState);
        expect(selector).toHaveLength(2);
    });

    it('should memoize results', () => {
        const firstCall = memorizedBugsSelector(mockState as BugState);
        const secondCall = memorizedBugsSelector(mockState as BugState);
        expect(firstCall).toBe(secondCall);
    });
});