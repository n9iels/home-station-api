export class DataHelper {
    removeOutliers(data: Array<number>) {
        let q1: number = this.calculateQ(data, 'Q1')
        let q3: number = this.calculateQ(data, 'Q3')
        let iqr: number = q3 - q1;

        return data.filter(v => v < q3 + (1.5 * iqr) && v > q1 - (1.5 * iqr))
    }

    private calculateQ(data: Array<number>, q: 'Q1' | 'Q3') {
        data.sort(function (a, b) {
            return a - b
        });

        if (data.length === 0) return 0

        var half = Math.floor(data.length / 2)

        if (data.length % 2) {
            let index1 = q == 'Q1' ? Math.floor(half / 2) : half + Math.floor(half / 2)
            let index2 = q == 'Q1' ? Math.floor(half / 2) + 1 : half + Math.floor(half / 2) + 1

            return (data[index1] + data[index2]) / 2
        } else {
            let index = q == 'Q1' ? Math.floor(half / 2) : Math.round(half + Math.floor(half / 2))

            return data[index]
        }
    }
}