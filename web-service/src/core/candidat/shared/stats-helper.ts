export class StatsHelper {
    static formatPercentage(value: { current_month: number; previous_month: number }) {
        const processed_value =
            value.current_month === 0 && value.previous_month === 0
                ? 0
                : ((value.current_month - value.previous_month) / value.previous_month) * 100;

        let formatted = processed_value.toFixed(2);

        if (formatted.endsWith(".00")) {
            formatted =
                processed_value > 0 ? "+" : processed_value == 0 ? "+0" : "" + parseInt(formatted, 10).toString();
        }

        return formatted;
    }
}
