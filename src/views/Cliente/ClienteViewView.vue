<template>
  <div>
    <input
    id="numeroDui"
    type="text"
    v-model="inputValue"
    @input="formatInput"
    maxlength="10"
    pattern="[0-9]{8}-[0-9]{1}"
    ref="numeroDui"
  />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    formatInput() {
      let currentValue = this.inputValue;
      let cursorPosition = this.$refs.numeroDui.selectionStart;

      var valAu = this.inputValue;
      if (!(/^\d{1,10}$/.test(valAu))) {
        var dui = document.getElementById('numeroDui');
        dui.value = '';
      } 

      currentValue = currentValue.replace(/\D/g, '');

      if (currentValue.length === 1 && !/^[0-9]$/.test(currentValue[0])) {
        currentValue = '';
      }

      if (currentValue.length > 0) {
        let formattedValue = '';
        for (let i = 0; i < currentValue.length; i++) {
          if (i === 8) {
            formattedValue += '-';
          }
          formattedValue += currentValue[i];
        }

        // Calcular la posición del cursor en función de los cambios realizados
        let newCursorPosition = cursorPosition;
        if (cursorPosition === 9 && formattedValue.length > 9) {
          newCursorPosition += 1;
        }

        this.inputValue = formattedValue;

        // Restablecer la posición del cursor
        this.$nextTick(() => {
          this.$refs.numeroDui.setSelectionRange(newCursorPosition, newCursorPosition);
        });
      }
    },
  },
};
</script>