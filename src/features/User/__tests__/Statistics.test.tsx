import { render } from "@testing-library/react"
import Statistics from "../Statistics"

beforeEach(() => {
    vi.mock("../../../api");
})

afterEach(() => {
    vi.restoreAllMocks();
})

it("should render without crashing", () => {
    render(<Statistics userId={1} />)
})

it("should match snapshot", async () => {
    const { asFragment, findByText } = render(<Statistics userId={1} />);

    const testProject1 = await findByText("testProject 1");
    expect(testProject1).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
})