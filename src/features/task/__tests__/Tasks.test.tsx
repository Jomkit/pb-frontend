import { render } from "@testing-library/react"
import Tasks from "../Tasks"
import { MemoryRouter } from "react-router-dom";
import userContext from "../../../components/contexts/userContext";

const user = {
    id: 1,
    username: "testUser1",
    firstName: "Test",
    lastName: "User",
    email: "test@email.com",
}

beforeEach(() => {
    vi.mock('../../../api');
    vi.mock('../../../components/hooks/useLocalStorage', () => ({
        default: () => ["1", vi.fn()]
    }));
})
afterEach(() => {
    vi.restoreAllMocks();
})

it("should render without crashing", () => {
    render(
        <MemoryRouter>
            <userContext.Provider value={user}>
                <Tasks />
            </userContext.Provider>
        </MemoryRouter>
    );
})

it("should match snapshot of loading view", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <userContext.Provider value={user}>
                <Tasks />
            </userContext.Provider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})

it("should match snapshot of loaded view", async () => {
    const { asFragment } = render(
        <MemoryRouter>
            <userContext.Provider value={user}>
                <Tasks />
            </userContext.Provider>
        </MemoryRouter>
    )
    
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(asFragment()).toMatchSnapshot();
})