import { render } from "@testing-library/react";
import Home from "../components/Home";
import UserContext from "../components/contexts/userContext";
import { MemoryRouter } from "react-router-dom";

describe("Home component", function() {
    vi.mock("../api");
    
    const testUser = {
        username: "testUser",
        id: 1,
        firstName: "test",
        lastName: "user",
        email: "test@user"
    }

    it('should render', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
    })

    it("should match snapshot of no logged-in user", () => {
        const { asFragment } = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        expect(asFragment()).toMatchSnapshot();
    })
    
    it("should match snapshot of logged-in user before loading", () => {
        const { asFragment } = render(
            <MemoryRouter>
                <UserContext.Provider value={testUser}>
                    <Home />
                </UserContext.Provider>
            </MemoryRouter>
        )

        expect(asFragment()).toMatchSnapshot();
    })

    it("should match snapshot of logged-in user after loading", async () => {
        const { asFragment, findByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={testUser}>
                    <Home />
                </UserContext.Provider>
            </MemoryRouter>
        )
        
        const addTaskBtn = await findByText("New Task");
        const Timer = await findByText("Timer");
        expect(addTaskBtn).toBeInTheDocument();
        expect(Timer).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    })
})