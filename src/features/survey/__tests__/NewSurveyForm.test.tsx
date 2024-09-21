import { render } from "@testing-library/react"
import NewSurveyForm from "../NewSurveyForm"

const testProjectId = "1";
const testTask = {
    id: "1",
    name: "testTask 1"
};
const timerId = "1";
const closePopup = vi.fn();

it("should render without crashing", () => {
    render(<NewSurveyForm projectId={testProjectId} task={testTask} timerId={timerId} closePopup={closePopup} />)
})

it("should match snapshot", () => {
    const { asFragment, getByRole, getByLabelText } = render(<NewSurveyForm projectId={testProjectId} task={testTask} timerId={timerId} closePopup={closePopup} />)

    expect(getByRole("radio", {name: "1"})).toBeInTheDocument();
    expect(getByLabelText("Notes")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
})