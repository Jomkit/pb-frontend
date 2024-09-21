import { render } from "@testing-library/react"
import UserProfile from "../UserProfile"
import userContext from "../../../components/contexts/userContext";

beforeEach(() => {
    vi.mock("../../../api");
})

afterEach(() => {
    vi.restoreAllMocks();
})

const testUser = {
    id: 1,
    username: "testUser",
    firstName: "testFirst",
    lastName: "testLast",
    email: "test@email.com"
}

it("should render without crashing", () => {
    render(
        <userContext.Provider value={testUser}>
            <UserProfile />
        </userContext.Provider>
    );
})

it("should match snapshot", async () => {
    const { asFragment, findByText } = render(
        <userContext.Provider value={testUser}>
            <UserProfile />
        </userContext.Provider>
    );

    const testProject1 = await findByText("testProject 1");
    expect(testProject1).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
})