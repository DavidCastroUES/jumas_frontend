<template>
  <div>
    <h1>Inputs con restricciones</h1>
    <form @submit.prevent="submitForm">
      <input
        ref="input1"
        v-model="input1"
        :rules="inputRules"
        label="Input 1"
        @input="handleInput(1)"
        @keydown.delete="handleDelete(1)"
        @keydown.left="handleLeftArrow(1)"
        @keydown.right="handleRightArrow(1)"
      >
      
      <input
        ref="input2"
        v-model="input2"
        :rules="inputRules"
        label="Input 2"
        @input="handleInput(2)"
        @keydown.delete="handleDelete(2)"
        @keydown.left="handleLeftArrow(2)"
        @keydown.right="handleRightArrow(2)"
      >
      <input
        ref="input3"
        v-model="input3"
        :rules="inputRules"
        label="Input 3"
        @input="handleInput(3)"
        @keydown.delete="handleDelete(3)"
        @keydown.left="handleLeftArrow(3)"
        @keydown.right="handleRightArrow(3)"
      >
      <input
        ref="input4"
        v-model="input4"
        :rules="inputRules"
        label="Input 4"
        @input="handleInput(4)"
        @keydown.delete="handleDelete(4)"
        @keydown.left="handleLeftArrow(4)"
        @keydown.right="handleRightArrow(4)"
        maxlength="1"
      >
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      inputRules: [
        v => v.length === 0 || v.length <= 4 || 'Max 4 digits',
        v => /^\d*$/.test(v) || 'Digits only',
      ],
    };
  },
  methods: {
    handleInput(inputNumber) {
      if (inputNumber === 1 && this.input1.length === 4) {
        this.$nextTick(() => {
          this.$refs.input2.focus();
        });
      } else if (inputNumber === 2 && this.input2.length === 6) {
        this.$nextTick(() => {
          this.$refs.input3.focus();
        });
      } else if (inputNumber === 3 && this.input3.length === 3) {
        this.$nextTick(() => {
          this.$refs.input4.focus();
        });
      }
    },
    handleDelete(inputNumber) {
      if (inputNumber > 1 && this.isEmpty(inputNumber)) {
        this.$nextTick(() => {
          this.$refs['input' + (inputNumber - 1)].focus();
        });
      }
    },
    handleLeftArrow(inputNumber) {
      if (inputNumber > 1) {
        this.$nextTick(() => {
          this.$refs['input' + (inputNumber - 1)].focus();
        });
      }
    },
    handleRightArrow(inputNumber) {
      if (inputNumber < 4) {
        this.$nextTick(() => {
          this.$refs['input' + (inputNumber + 1)].focus();
        });
      }
    },
    isEmpty(inputNumber) {
      const input = this['input' + inputNumber];
      return input.length === 0 || /^\s*$/.test(input);
    },
    submitForm() {
      // Aquí puedes realizar las acciones necesarias con los datos del formulario
      console.log('Form submitted');
      console.log('Input 1:', this.input1);
      console.log('Input 2:', this.input2);
      console.log('Input 3:', this.input3);
      console.log('Input 4:', this.input4);
    },
  },
};
</script>
