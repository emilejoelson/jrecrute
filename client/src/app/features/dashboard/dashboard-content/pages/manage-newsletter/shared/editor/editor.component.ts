// editor.component.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit, AfterViewInit {
  @Input() initialContent = '';
  @Output() contentChange = new EventEmitter<string>();
  @ViewChild('editorContainer') editorElement!: ElementRef;

  content = '';
  isShowingHtml = false;
  isRTL = false;
  textDirection = 'ltr';
  selectedHeading = 'p';

  headingOptions = [
    { value: 'p', label: 'Paragraph' },
    { value: 'h1', label: 'Heading 1' },
    { value: 'h2', label: 'Heading 2' },
    { value: 'h3', label: 'Heading 3' },
    { value: 'h4', label: 'Heading 4' },
  ];

  ngOnInit(): void {
    this.content = this.initialContent;
    
    // Only auto-detect RTL if there's initial content and it contains Arabic text
    if (this.initialContent && this.containsArabic(this.initialContent)) {
      this.isRTL = true;
      this.textDirection = 'rtl';
    }
  }

  ngAfterViewInit(): void {
    if (this.editorElement) {
      this.editorElement.nativeElement.innerHTML = this.content;
      this.updateDirectionAttributes();
      
      // Set focus to the editor
      setTimeout(() => {
        this.editorElement.nativeElement.focus();
      }, 0);
    }
  }

  toggleDirection(): void {
    this.isRTL = !this.isRTL;
    this.textDirection = this.isRTL ? 'rtl' : 'ltr';
    this.updateDirectionAttributes();
    this.updateContent();
  }

  updateDirectionAttributes(): void {
    if (this.editorElement) {
      this.editorElement.nativeElement.style.direction = this.textDirection;
      this.editorElement.nativeElement.dir = this.textDirection;
    }
  }

  containsArabic(text: string): boolean {
    if (!text) return false;
    
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  }

  executeCommand(command: string): void {
    if (command === 'createLink') {
      const url = prompt('Enter the URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else if (command === 'insertImage') {
      const url = prompt('Enter the image URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else {
      document.execCommand(command, false);
    }
    this.updateContent();
    
    // Refocus on the editor after command execution
    if (this.editorElement) {
      this.editorElement.nativeElement.focus();
    }
  }

  formatHeading(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedHeading = selectElement.value;
    document.execCommand('formatBlock', false, this.selectedHeading);
    this.updateContent();
    
    // Refocus on the editor after formatting
    if (this.editorElement) {
      this.editorElement.nativeElement.focus();
    }
  }

  toggleHtmlView(): void {
    this.isShowingHtml = !this.isShowingHtml;
    if (this.isShowingHtml) {
      this.content = this.editorElement.nativeElement.innerHTML;
    } else {
      this.editorElement.nativeElement.innerHTML = this.content;
      
      // Refocus on the editor when switching back to visual mode
      setTimeout(() => {
        if (this.editorElement) {
          this.editorElement.nativeElement.focus();
        }
      }, 0);
    }
  }

  onContentChange() {
    // Only auto-detect RTL for new content if not already in RTL mode
    if (!this.isRTL && this.editorElement && this.containsArabic(this.editorElement.nativeElement.innerText)) {
      this.isRTL = true;
      this.textDirection = 'rtl';
      this.updateDirectionAttributes();
    }
    
    this.updateContent();
  }

  updateContent(): void {
    if (this.isShowingHtml) {
      this.contentChange.emit(this.content);
    } else if (this.editorElement) {
      this.content = this.editorElement.nativeElement.innerHTML;
      this.contentChange.emit(this.content);
    }
  }

  getWordCount(): number {
    if (!this.content) return 0;
    const text = this.stripHtml(this.content).trim();
    return text ? text.split(/\s+/).length : 0;
  }

  getCharacterCount(): number {
    if (!this.content) return 0;
    return this.stripHtml(this.content).length;
  }

  private stripHtml(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  @HostListener('document:selectionchange', ['$event'])
  onSelectionChange(event: Event): void {
    // Update the selected heading when the cursor moves to a different element
    if (!this.isShowingHtml && this.editorElement) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const parentElement = selection.getRangeAt(0).startContainer.parentElement;
        if (parentElement) {
          const tagName = this.findParentBlockElement(parentElement);
          if (tagName && this.headingOptions.some(option => option.value === tagName.toLowerCase())) {
            this.selectedHeading = tagName.toLowerCase();
          }
        }
      }
    }
  }

  private findParentBlockElement(element: Element): string {
    const blockElements = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DIV'];
    let current = element;
    
    while (current && current !== this.editorElement.nativeElement) {
      if (blockElements.includes(current.tagName)) {
        return current.tagName;
      }
      if (current.parentElement) {
        current = current.parentElement;
      } else {
        break;
      }
    }
    
    return 'p'; // Default to paragraph
  }
}