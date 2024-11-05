export class CustomDateUtils {
  static convertStringDate(dateString: string): string {
    const date = new Date(dateString);

    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    const suffix = this.getDaySuffix(parseInt(day));
    const formattedDate = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
      .format(date)
      .replace(day, `${day}${suffix}`);

    return formattedDate;
  }

  static convertDate(date: Date): string {
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    const suffix = this.getDaySuffix(parseInt(day));
    const formattedDate = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
      .format(date)
      .replace(day, `${day}${suffix}`);

    return formattedDate;
  }

  static getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  static convertTimeOfDayToISO8601(
    time: { hour: number; minute: number } | null
  ): string | null {
    if (!time) return null;

    const now = new Date();

    const dateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      time.hour,
      time.minute
    );

    return dateTime.toISOString();
  }

  static differenceInTime(start: Date, end: Date): string {
    const differenceInMs = end.getTime() - start.getTime();
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const years = end.getFullYear() - start.getFullYear();

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      return `${days} day${days > 1 ? 's' : ''}`;
    }
  }
}
