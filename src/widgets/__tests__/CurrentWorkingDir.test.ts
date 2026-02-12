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
import { CurrentWorkingDirWidget } from '../CurrentWorkingDir';

describe('CurrentWorkingDirWidget - Short Mode', () => {
    it('should render leaf directory in short mode', () => {
        const widget = new CurrentWorkingDirWidget();
        const context: RenderContext = { data: { cwd: '/Users/example/Documents/Projects/my-project' } };
        const item: WidgetItem = {
            id: 'current-working-dir',
            type: 'current-working-dir',
            metadata: { shortMode: 'true' }
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        expect(result).toBe('cwd: my-project');
    });

    it('should render leaf directory in short mode (Windows path)', () => {
        const widget = new CurrentWorkingDirWidget();
        const context: RenderContext = { data: { cwd: 'C:\\Users\\example\\Documents\\Projects\\my-project' } };
        const item: WidgetItem = {
            id: 'current-working-dir',
            type: 'current-working-dir',
            metadata: { shortMode: 'true' }
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        expect(result).toBe('cwd: my-project');
    });

    it('should render preview in short mode', () => {
        const widget = new CurrentWorkingDirWidget();
        const context: RenderContext = { isPreview: true };
        const item: WidgetItem = {
            id: 'current-working-dir',
            type: 'current-working-dir',
            metadata: { shortMode: 'true' }
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        expect(result).toBe('cwd: my-project');
    });

    it('should display modifier text for short mode', () => {
        const widget = new CurrentWorkingDirWidget();
        const item: WidgetItem = {
            id: 'current-working-dir',
            type: 'current-working-dir',
            metadata: { shortMode: 'true' }
        };

        const editorDisplay = widget.getEditorDisplay(item);
        expect(editorDisplay.modifierText).toBe('(short)');
    });

    it('should handle toggle-short-mode action to enable', () => {
        const widget = new CurrentWorkingDirWidget();
        const item: WidgetItem = {
            id: 'current-working-dir',
            type: 'current-working-dir'
        };

        const result = widget.handleEditorAction('toggle-short-mode', item);
        expect(result?.metadata?.shortMode).toBe('true');
    });

    it('should handle toggle-short-mode action to disable', () => {
        const widget = new CurrentWorkingDirWidget();
        const item: WidgetItem = {
            id: 'current-working-dir',
            type: 'current-working-dir',
            metadata: { shortMode: 'true' }
        };

        const result = widget.handleEditorAction('toggle-short-mode', item);
        expect(result?.metadata?.shortMode).toBeUndefined();
    });

    it('should clear fish-style and segments when enabling short mode', () => {
        const widget = new CurrentWorkingDirWidget();
        const item: WidgetItem = {
            id: 'current-working-dir',
            type: 'current-working-dir',
            metadata: { fishStyle: 'true', segments: '2' }
        };

        const result = widget.handleEditorAction('toggle-short-mode', item);
        expect(result?.metadata?.shortMode).toBe('true');
        expect(result?.metadata?.fishStyle).toBeUndefined();
        expect(result?.metadata?.segments).toBeUndefined();
    });

    it('should include short mode keybind', () => {
        const widget = new CurrentWorkingDirWidget();
        const keybinds = widget.getCustomKeybinds();

        const shortModeKeybind = keybinds.find(kb => kb.action === 'toggle-short-mode');
        expect(shortModeKeybind).toBeDefined();
        expect(shortModeKeybind).toMatchObject({ key: 'h' });
    });
});