export class StatsHelper {
    static formatPercentage(percentage: number) {
        let formatted = percentage.toFixed(2);

        if (formatted.endsWith(".00")) {
            formatted = parseInt(formatted, 10).toString();
        }

        return formatted;
    }
}
