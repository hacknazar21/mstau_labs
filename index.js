document.addEventListener("DOMContentLoaded", () => {
  const value_A_label = document.getElementById("value_A_label");
  const value_B_label = document.getElementById("value_B_label");
  const value_A_input = document.getElementById("value_A");
  const value_B_input = document.getElementById("value_B");
  const ATrans_result_label = document.getElementById("ATrans_result");
  const BTrans_result_label = document.getElementById("BTrans_result");

  const calculate_button = document.getElementById("calculate_button");
  let is_error = false;
  calculate_button.addEventListener("click", () => {
    const value_A_input_value = value_A_input.value;
    const value_B_input_value = value_B_input.value;
    if (!value_A_input_value || value_A_input_value === "") {
      value_A_label.style.color = "red";
      is_error = true;
    }
    if (!value_B_input_value || value_B_input_value === "") {
      value_B_label.style.color = "red";
      is_error = true;
    }
    if (!is_error) {
      const value_A = value_A_input_value
        .replaceAll(" ", "")
        .split(";")
        .map((value) =>
          value.split(",").map((value_number) => {
            if (!value_number[1]) return Number(value_number);
            else return -Number(value_number[1]);
          })
        );
      const value_B = value_B_input_value
        .replaceAll(" ", "")
        .split(";")
        .map((value) =>
          value.split(",").map((value_number) => {
            if (!value_number[1]) return Number(value_number);
            else return -Number(value_number[1]);
          })
        );

      const ATrans_result = ATrans(value_A);
      const BTrans_result = ATrans(value_B);
      ATrans_result_label.innerHTML = `[${ATrans_result.toString()}]`;
      BTrans_result_label.innerHTML = `[${BTrans_result.toString()}]`;
    }
  });

  function ATrans(A) {
    const a = A[0];
    const b = A[1];
    const c = A[2];
    const d = A[3];
    const aMinusb = AMinusB(AMultiplyB(a, d), AMultiplyB(b, c));
    const bMinusc = AMinusB(AMultiplyB(b, c), AMultiplyB(a, d));
    const A_0 = ADivideB(d, aMinusb);
    const A_1 = ADivideB(b, bMinusc);
    const A_2 = ADivideB(c, bMinusc);
    const A_3 = ADivideB(a, aMinusb);
    return [A_0, A_1, A_2, A_3];
  }

  function AMinusB(A, B) {
    return [A[0] - B[1], A[1] - B[0]];
  }

  function AMultiplyB(A, B) {
    const formula_value = [A[0] * B[0], A[0] * B[1], A[1] * B[0], A[1] * B[1]];
    return [Math.min(...formula_value), Math.max(...formula_value)];
  }

  function ADivideB(A, B) {
    const values_A = [A[0], A[1]];
    const values_B = [1 / Math.max(B[1], 0.00001), 1 / Math.max(B[0], 0.00001)];
    return multiplyVectors(values_A, values_B);
  }

  function multiplyVectors(a, b) {
    return [(a[0] * b[0]).toFixed(2), (a[1] * b[1]).toFixed(2)];
  }

  value_A_input.addEventListener("input", () => {
    is_error = false;
    value_A_label.style.color = "inherit";
  });
  value_B_input.addEventListener("input", () => {
    is_error = false;
    value_B_label.style.color = "inherit";
  });
});
