import { render } from "@testing-library/react"
import AddBtn from "../components/AddBtn"

describe("AddBtn", function(){
    const testAdd = vi.fn();

    it('should render without crashing', () => { 
        render(<AddBtn handleClick={testAdd} btnName="testAddBtn" />);
    })

    it('should match snapshot', () => { 
        const { asFragment } = render(<AddBtn handleClick={testAdd} btnName="testAddBtn" />)
        expect(asFragment()).toMatchSnapshot();
    })
})