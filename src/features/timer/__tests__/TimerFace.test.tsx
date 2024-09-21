import { render } from "@testing-library/react"
import TimerFace from "../TimerFace"

it("should render without crashing", () => {
    render(<TimerFace min={10} sec={15} />)
})

it("should match snapshot", () => {
    const { asFragment } = render(<TimerFace min={10} sec={15} />)
    expect(asFragment()).toMatchSnapshot();
})