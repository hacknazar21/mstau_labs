document.addEventListener("DOMContentLoaded", () => {
  const value_A_label = document.getElementById("value_A_label");
  const value_B_label = document.getElementById("value_B_label");
  const value_A_input = document.getElementById("value_A");
  const value_B_input = document.getElementById("value_B");
  const APlusB_result_label = document.getElementById("APlusB_result");
  const AMinusB_result_label = document.getElementById("AMinusB_result");
  const AMultiplyB_result_label = document.getElementById("AMultiplyB_result");
  const ADivideB_result_label = document.getElementById("ADivideB_result");

  const calculate_button = document.getElementById("calculate_button");
  let is_error = false;
  calculate_button.addEventListener("click", () => {
    const value_A_input_value = value_A_input.value;
    const value_B_input_value = value_B_input.value;
    const input_regexp = /\d,\d/;
    if (
      !value_A_input_value ||
      value_A_input_value === "" ||
      !input_regexp.test(value_A_input_value.replaceAll(" ", ""))
    ) {
      value_A_label.style.color = "red";
      is_error = true;
    }
    if (
      !value_B_input_value ||
      value_B_input_value === "" ||
      !input_regexp.test(value_B_input_value.replaceAll(" ", ""))
    ) {
      value_B_label.style.color = "red";
      is_error = true;
    }
    if (!is_error) {
      const value_A = value_A_input_value
        .replaceAll(" ", "")
        .split(",")
        .map((value) => Number(value));
      const value_B = value_B_input_value
        .replaceAll(" ", "")
        .split(",")
        .map((value) => Number(value));

      const APlusB_result = APlusB(value_A, value_B);
      const AMinusB_result = AMinusB(value_A, value_B);
      const AMultiplyB_result = AMultiplyB(value_A, value_B);
      const ADivideB_result = ADivideB(value_A, value_B);

      APlusB_result_label.innerHTML = `[${APlusB_result.toString()}]`;
      AMinusB_result_label.innerHTML = `[${AMinusB_result.toString()}]`;
      AMultiplyB_result_label.innerHTML = `[${AMultiplyB_result.toString()}]`;
      ADivideB_result_label.innerHTML = `[${ADivideB_result.toString()}]`;
    }
  });

  function APlusB(A, B) {
    return [A[0] + B[0], A[1] + B[1]];
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
    const values_B = [1 / B[1], 1 / B[0]];
    return multiplyVectors(values_A, values_B);
  }

  function multiplyVectors(a, b) {
    return [a[0] * b[0], a[1] * b[1]];
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
