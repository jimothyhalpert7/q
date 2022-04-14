import ReactDOM from "react-dom";
import React from "react";
import { Formik, Field, Form, useFormikContext } from "formik";

const Radio = (props) => {
  const { values, setFieldValue } = useFormikContext();

  const value = values[props.name];

  React.useEffect(() => {
    console.log("radioId", value);
    setFieldValue(props.name, value);
  }, [props, value, setFieldValue]);

  return (
    <div>
      <div role="group" aria-labelledby="my-radio-group">
        {props.items.map((item) => (
          <label key={item}>
            <Field
              key={item}
              type="radio"
              name={props.name}
              value={item}
              checked={value == item}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

var Page = () => (
  <div>
    <h1>Slater-Usoh-Steed questionnaire</h1>
    <p>
      Thank you for your participation in the experiment. It’ll take you about
      15 - 20 minutes to fill in the questionnaire.
    </p>
    <hr />
    <h2>Please rate your sense of being in the virtual environment.</h2>
    <Radio items={[1, 2, 3, 4, 5, 6, 7]}></Radio>
    <hr />
    <h2>
      To what extent were there times during the experience when the virtual
      environment was the reality for you?
    </h2>
    <Field />
    <hr />
    <h2>
      When you think back to the experience, do you think of the virtual
      environment more as images that you saw or more as somewhere that you
      visited?
    </h2>
    <Field />
    <hr />
  </div>
);

const FormPage = () => {
  var tures = Page()
    .props.children.map((child) => typeof child.type !== "string")
    .filter((child) => child)
    .map((filtered) => "");
  var formItemId = 0;

  const transformedPage = Page().props.children.map((child) => {
    if (typeof child.type !== "string") {
      child.props.name = formItemId;
      var cloned = React.cloneElement(child, { name: formItemId });
      console.log(cloned);
      formItemId += 1;
      return cloned;
    }
    return child;
  });

  return (
    <Formik
      initialValues={{ ...tures }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
        function download(content, fileName, contentType) {
          var a = document.createElement("a");
          var file = new Blob([content], { type: contentType });
          a.href = URL.createObjectURL(file);
          a.download = fileName;
          a.click();
          alert(1);
        }
        download(JSON.stringify(values, null, 2), "json.txt", "text/plain");
      }}
    >
      {({ values }) => (
        <Form>
          {transformedPage}
          <button type="submit">Submit</button>
          {values.radioId}
        </Form>
      )}
    </Formik>
  );
};

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
download(JSON.stringify("a", null, 2), "json.txt", "text/plain");

ReactDOM.render(<FormPage />, document.getElementById("root"));

const element = document.createElement("a");
const file = new Blob(["tst"], { type: "text/plain" });
element.href = URL.createObjectURL(file);
element.download = "myFile.txt";
document.body.appendChild(element); // Required for this to work in FireFox
element.click();
