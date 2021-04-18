import { mount, shallow } from "enzyme";

import Counter from "./Counter";

describe("Initial state", () => {
  test("should initial state be 0", () => {
    const wrapper = shallow(<Counter />);

    expect(wrapper.state("counter")).toEqual(0);
    expect(wrapper.state("initial")).toEqual(0);
  });

  test("should initialize with provided counter", () => {
    const wrapper = shallow(<Counter start="10" />);

    expect(wrapper.state("counter")).toEqual(10);
    expect(wrapper.state("initial")).toEqual(10);
  });

  test("show the counter", () => {
    const wrapper = shallow(<Counter start="11" />);
    const counter = wrapper.find("span.counts");
    expect(counter.text()).toBe("11");
  });
});

describe("Increment & decrement operations to initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Counter />);
  });

  test("should have increment button", () => {
    expect(wrapper.find(".increment").exists()).toBeTruthy();
  });

  test("should have decrement button", () => {
    expect(wrapper.find(".decrement").exists).toBeTruthy();
  });

  test("should increment counter", () => {
    wrapper.find(".increment").simulate("click");
    expect(wrapper.state("counter")).toBe(1);
  });

  test("should decrement counter", () => {
    wrapper.find(".decrement").simulate("click");
    expect(wrapper.state("counter")).toBe(-1);
  });
});

describe("Input for initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Counter start="10" />);
  });

  test("should update counter and initial start?", () => {
    const input = wrapper.find("input");
    input.simulate("change", {
      target: { value: "99" },
    });

    expect(wrapper.state("initialInput")).toBe("99");
    expect(wrapper.state("initial")).toBe(10); //it should not change that yet

    const submitButton = wrapper.find({ type: "submit" });
    expect(submitButton.exists()).toBeTruthy();
    expect(submitButton.text()).toBe("Zmień");

    submitButton.simulate("submit");
    const form = wrapper.find("form");
    expect(form.exists()).toBeTruthy();

    console.log(form.prop("onSubmit"));
    form.simulate("submit", {
      preventDefault: () => {},
    });

    expect(wrapper.state("initial")).toBe(99);
    expect(wrapper.state("counter")).toBe(99);
    expect(wrapper.state("initialInput")).toBe("");
  });
});

describe("Reset button", () => {
  test("should button be present", () => {
    const wrapper = shallow(<Counter />);
    const button = wrapper.find(".reset");
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe("Reset");
  });

  test("should reset to 0 if no start value", () => {
    const wrapper = shallow(<Counter />);
    wrapper.setState({counter: 20});
    const resetButton = wrapper.find(".reset");
    resetButton.simulate("click");
    expect(wrapper.state("counter")).toEqual(0);
  });

  test("should reset back to start value", () => {
    const wrapper = shallow(<Counter start="10" />);
    wrapper.setState({ counter: 20 });
    const resetButton = wrapper.find(".reset");
    resetButton.simulate("click");
    expect(wrapper.state("counter")).toEqual(10);
  });
});
