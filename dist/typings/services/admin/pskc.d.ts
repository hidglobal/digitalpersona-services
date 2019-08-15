export interface PSKCOutput {
    /** A serial number of the hardware OTP token imported. */
    serial_number?: string;
    /** An errror occurred during OTP token import. The error is 0 if OTP token is imported successfully. */
    error?: number;
    /** An error message if OTP token failed to import. */
    error_text?: string;
}
