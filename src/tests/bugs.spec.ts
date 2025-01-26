import { addBug } from "../store/entities/bugs";
import { apiCallStarted } from "../store/constants/api-bugs-constants";
import store from "../store/store";
 
describe('bugSlice', () => {
    describe("action creators", () => {
        const bug = {
            "id": "71226abd-16f3-4220-8511-b373c022361a",
            "description": "Frontend button issue",
            "userId": 1,
            "resolved": false,
            "priority": "High",
            "tags": [
                "UI",
                "Critical"
            ],
            "reportedAt": "2024-11-01",
            "severity": "Critical"
        }
        it("addBug", async() => {
            const result = await store.dispatch(addBug(bug))
            const expected = {
                type: apiCallStarted.type,
                payload: {
                    url: "/bugs",
                    method: "post",
                    data:bug,
                    onStart: "bugs/bugsRequested",
                    onSuccess: "bugs/bugAdded",
                    onError: "bugs/bugsRequestFailed"
                }
            }
            expect(result).toEqual(expected);
        });
    })
})

 