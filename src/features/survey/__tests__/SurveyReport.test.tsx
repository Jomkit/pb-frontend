import { render } from "@testing-library/react"
import SurveyReport from "../SurveyReport"

vi.mock("../../../api");

it("should render without crashing", () => {
    render(<SurveyReport userId={1} />);
})

it("should match snapshot while loading", () => {
    const { asFragment } = render(<SurveyReport userId={1} />);
    expect(asFragment()).toMatchSnapshot();
})

it("should calculate weekly scores and most productive dates", async () => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const { findByText } = render(<SurveyReport userId={1} />);
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(await findByText(dayNames[today.getDay()], {exact: false})).toBeInTheDocument();
})