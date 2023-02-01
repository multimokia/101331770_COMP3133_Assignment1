export const EMAIL_PROP = {
  type: String,
  required: true,
  maxLength: 50,
  unique: true,
  validate: {
    validator: function(x: string) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
    },
    message: '{VALUE} is not a valid email.'
  }
};
