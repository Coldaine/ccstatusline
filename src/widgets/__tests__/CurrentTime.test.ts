import {
    describe,
    expect,
    it
} from 'vitest';

import type {
    RenderContext,
    WidgetItem
} from '../../types';
import { DEFAULT_SETTINGS } from '../../types/Settings';
import { CurrentTimeWidget } from '../CurrentTime';

describe('CurrentTimeWidget', () => {
    it('should render time in preview mode (24hr)', () => {
        const widget = new CurrentTimeWidget();
        const context: RenderContext = { isPreview: true };
        const item: WidgetItem = {
            id: 'current-time',
            type: 'current-time'
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        expect(result).toBe(' 13:26');
    });

    it('should render time in preview mode (12hr)', () => {
        const widget = new CurrentTimeWidget();
        const context: RenderContext = { isPreview: true };
        const item: WidgetItem = {
            id: 'current-time',
            type: 'current-time',
            metadata: { format: '12hr' }
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        expect(result).toBe(' 01:26 PM');
    });

    it('should render actual time in 24hr format', () => {
        const widget = new CurrentTimeWidget();
        const context: RenderContext = {};
        const item: WidgetItem = {
            id: 'current-time',
            type: 'current-time'
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        // Validate format: HH:MM with leading space
        expect(result).toMatch(/^ \d{2}:\d{2}$/);
    });

    it('should render actual time in 12hr format', () => {
        const widget = new CurrentTimeWidget();
        const context: RenderContext = {};
        const item: WidgetItem = {
            id: 'current-time',
            type: 'current-time',
            metadata: { format: '12hr' }
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        // Validate format: H:MM AM/PM or HH:MM AM/PM with leading space
        expect(result).toMatch(/^ \d{1,2}:\d{2} (AM|PM)$/);
    });

    it('should render time with raw value mode', () => {
        const widget = new CurrentTimeWidget();
        const context: RenderContext = {};
        const item: WidgetItem = {
            id: 'current-time',
            type: 'current-time',
            rawValue: true
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        // Validate format: HH:MM (no leading space in raw mode)
        expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('should render time with Nerd Font icon', () => {
        const widget = new CurrentTimeWidget();
        const context: RenderContext = {};
        const settings = { ...DEFAULT_SETTINGS, nerdFontIcons: true };
        const item: WidgetItem = {
            id: 'current-time',
            type: 'current-time'
        };

        const result = widget.render(item, context, settings);
        // Validate format: icon + space + HH:MM
        expect(result).toMatch(/^\uF017 \d{2}:\d{2}$/);
    });

    it('should display modifier text for 12hr format', () => {
        const widget = new CurrentTimeWidget();
        const item: WidgetItem = {
            id: 'current-time',
            type: 'current-time',
            metadata: { format: '12hr' }
        };

        const editorDisplay = widget.getEditorDisplay(item);
        expect(editorDisplay.modifierText).toBe('(12hr)');
    });

    it('should not display modifier text for 24hr format', () => {
        const widget = new CurrentTimeWidget();
        const item: WidgetItem = {
            id: 'current-time',
            type: 'current-time'
        };

        const editorDisplay = widget.getEditorDisplay(item);
        expect(editorDisplay.modifierText).toBeUndefined();
    });
});