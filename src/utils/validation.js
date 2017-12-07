class FieldValidator {
    constructor(value) {
        this.value = value;
        this.errors = [];
    }

    result() {
        return this.errors.length ? this.errors[0] : null;
    }

    optional() {
        return this.value ? this.result() : null;
    }

    notEmpty() {
        if (!this.value.trim()) {
            this.errors.push('This can\'t be empty nor only spaces');
        }

        return this;
    }

    notNumeric() {
        const pattern = /^[a-zA-Z\s-]*$/;

        if (!pattern.test(this.value)) {
            this.errors.push('Only alphabetic characters, spaces and dashes are allowed');
        }

        return this;
    }

    max(number) {
        if (this.value.length > number) {
            this.errors.push(`A maximum of ${number} characters is allowed`);
        }

        return this;
    }

    min(number) {
        if (this.value.length < number) {
            this.errors.push(`A minimum of ${number} characters is allowed`);
        }

        return this;
    }
}

export default FieldValidator;
