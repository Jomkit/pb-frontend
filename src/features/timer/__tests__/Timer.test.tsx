import { render } from "@testing-library/react"
import Timer from "../Timer";
import { MemoryRouter } from "react-router-dom";
import userContext from "../../../components/contexts/userContext";
import userEvent from "@testing-library/user-event";

const testUser = {
    id: 1,
    username: "testUser",
    firstName: "first",
    lastName: "last",
    email: "test@email.com",
}

beforeEach( () => {
    vi.mock("../../../api");
})

afterEach( () => {
    vi.restoreAllMocks();
})

it("should render without crashing", () => {
    render(<Timer projectId="1" />);
})

it("should match snapshot", () => {
    const { asFragment } = render(<Timer projectId="1" />);
    expect(asFragment()).toMatchSnapshot();
})

it("change resume button to pause button when timer is running", async () => {
    const user = userEvent.setup();
    const { container } = render(
        <MemoryRouter>
            <userContext.Provider value={ testUser }>
                <Timer projectId="1" />
            </userContext.Provider>
        </MemoryRouter>
    );

    const restartBtn = container.querySelector("#restart-btn");
    const startBtn = container.querySelector("#start-btn");
    expect(startBtn).toBeInTheDocument();
    expect(restartBtn).toBeInTheDocument();
    
    await user.click(startBtn!);

    const pauseBtn = container.querySelector("#pause-btn");
    expect(pauseBtn).toBeInTheDocument();
})