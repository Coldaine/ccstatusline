import type { RenderContext } from '../types/RenderContext';
import type { Settings } from '../types/Settings';
import type {
    Widget,
    WidgetEditorDisplay,
    WidgetItem
} from '../types/Widget';
import { formatWidgetLabel } from '../utils/nerd-font-icons';

export class CurrentTimeWidget implements Widget {
    getDefaultColor(): string { return 'yellow'; }
    getDescription(): string { return 'Shows current wall clock time'; }
    getDisplayName(): string { return 'Current Time'; }
    getEditorDisplay(item: WidgetItem): WidgetEditorDisplay {
        const format = item.metadata?.format ?? '24hr';
        return {
            displayText: this.getDisplayName(),
            modifierText: format === '12hr' ? '(12hr)' : undefined
        };
    }

    render(item: WidgetItem, context: RenderContext, settings: Settings): string | null {
        if (context.isPreview) {
            const format = item.metadata?.format ?? '24hr';
            const previewTime = format === '12hr' ? '1:26 PM' : '13:26';
            return formatWidgetLabel('current-time', previewTime, ' ', item.rawValue, settings.nerdFontIcons);
        }

        const now = new Date();
        const format = item.metadata?.format ?? '24hr';
        let timeString: string;

        if (format === '12hr') {
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours === 0 ? 12 : hours; // 0 should be 12
            const minutesStr = minutes.toString().padStart(2, '0');
            timeString = `${hours}:${minutesStr} ${ampm}`;
        } else {
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeString = `${hours}:${minutes}`;
        }

        return formatWidgetLabel('current-time', timeString, ' ', item.rawValue, settings.nerdFontIcons);
    }

    supportsRawValue(): boolean { return true; }
    supportsColors(item: WidgetItem): boolean { return true; }
}