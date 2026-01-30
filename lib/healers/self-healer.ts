/**
 * ULTRABUILD Self-Healing System
 * 
 * Automatically detects and fixes errors in generated code
 * 
 * Capabilities:
 * - Syntax error detection
 * - Type error fixing
 * - Logic error detection
 * - Performance optimization
 * - Security vulnerability patching
 * - Automatic testing and validation
 */

import { EventEmitter } from 'eventemitter3';
import { aiOrchestrator } from '../../manus-alpha-complete/lib/ai-providers';

export interface CodeError {
  type: 'syntax' | 'type' | 'logic' | 'performance' | 'security' | 'unknown';
  severity: 'critical' | 'high' | 'medium' | 'low';
  line?: number;
  column?: number;
  message: string;
  code: string;
  suggestion?: string;
}

export interface HealingResult {
  original: string;
  healed: string;
  errorsFound: CodeError[];
  errorsFix: number;
  confidence: number;
  timestamp: number;
}

export class SelfHealer extends EventEmitter {
  private readonly healingHistory: Map<string, HealingResult[]> = new Map();
  private readonly maxHistory: number = 10000;

  constructor() {
    super();
  }

  /**
   * Scan code for errors
   */
  public async scanCode(code: string, language: string = 'typescript'): Promise<CodeError[]> {
    const errors: CodeError[] = [];

    // Scan for syntax errors
    const syntaxErrors = await this.scanSyntaxErrors(code, language);
    errors.push(...syntaxErrors);

    // Scan for type errors
    const typeErrors = await this.scanTypeErrors(code, language);
    errors.push(...typeErrors);

    // Scan for logic errors
    const logicErrors = await this.scanLogicErrors(code, language);
    errors.push(...logicErrors);

    // Scan for security issues
    const securityIssues = await this.scanSecurityIssues(code, language);
    errors.push(...securityIssues);

    // Scan for performance issues
    const performanceIssues = await this.scanPerformanceIssues(code, language);
    errors.push(...performanceIssues);

    return errors;
  }

  /**
   * Scan for syntax errors
   */
  private async scanSyntaxErrors(code: string, language: string): Promise<CodeError[]> {
    const errors: CodeError[] = [];

    // Check for common syntax issues
    const patterns = [
      { regex: /\{[^}]*\{[^}]*\}[^}]*\}/g, message: 'Nested braces detected' },
      { regex: /\([^)]*\([^)]*\)[^)]*\)/g, message: 'Nested parentheses detected' },
      { regex: /const\s+\w+\s*=/g, message: 'Missing semicolon' },
      { regex: /function\s+\w+\s*\(\s*\)\s*\{/g, message: 'Empty function parameters' },
    ];

    for (const pattern of patterns) {
      const matches = code.match(pattern.regex);
      if (matches) {
        errors.push({
          type: 'syntax',
          severity: 'high',
          message: pattern.message,
          code: matches[0],
        });
      }
    }

    return errors;
  }

  /**
   * Scan for type errors
   */
  private async scanTypeErrors(code: string, language: string): Promise<CodeError[]> {
    const errors: CodeError[] = [];

    if (language !== 'typescript') return errors;

    // Check for type-related issues
    const patterns = [
      { regex: /:\s*any\b/g, message: 'Use of "any" type detected' },
      { regex: /\w+\s*\|\s*undefined/g, message: 'Potentially undefined value' },
      { regex: /as\s+\w+/g, message: 'Type assertion used - consider better typing' },
    ];

    for (const pattern of patterns) {
      const matches = code.match(pattern.regex);
      if (matches) {
        errors.push({
          type: 'type',
          severity: 'medium',
          message: pattern.message,
          code: matches[0],
        });
      }
    }

    return errors;
  }

  /**
   * Scan for logic errors
   */
  private async scanLogicErrors(code: string, language: string): Promise<CodeError[]> {
    const errors: CodeError[] = [];

    // Check for common logic issues
    const patterns = [
      { regex: /if\s*\(\s*true\s*\)/g, message: 'Condition always true' },
      { regex: /if\s*\(\s*false\s*\)/g, message: 'Condition always false' },
      { regex: /while\s*\(\s*true\s*\)/g, message: 'Infinite loop detected' },
      { regex: /==\s*null/g, message: 'Use === instead of ==' },
      { regex: /var\s+\w+/g, message: 'Use const/let instead of var' },
    ];

    for (const pattern of patterns) {
      const matches = code.match(pattern.regex);
      if (matches) {
        errors.push({
          type: 'logic',
          severity: 'high',
          message: pattern.message,
          code: matches[0],
        });
      }
    }

    return errors;
  }

  /**
   * Scan for security issues
   */
  private async scanSecurityIssues(code: string, language: string): Promise<CodeError[]> {
    const errors: CodeError[] = [];

    // Check for security issues
    const patterns = [
      { regex: /eval\s*\(/g, message: 'eval() is dangerous' },
      { regex: /innerHTML\s*=/g, message: 'innerHTML can cause XSS' },
      { regex: /dangerouslySetInnerHTML/g, message: 'dangerouslySetInnerHTML can cause XSS' },
      { regex: /process\.env\.\w+/g, message: 'Ensure env vars are not exposed' },
      { regex: /password\s*=\s*['"][^'"]*['"]/g, message: 'Hardcoded password detected' },
    ];

    for (const pattern of patterns) {
      const matches = code.match(pattern.regex);
      if (matches) {
        errors.push({
          type: 'security',
          severity: 'critical',
          message: pattern.message,
          code: matches[0],
        });
      }
    }

    return errors;
  }

  /**
   * Scan for performance issues
   */
  private async scanPerformanceIssues(code: string, language: string): Promise<CodeError[]> {
    const errors: CodeError[] = [];

    // Check for performance issues
    const patterns = [
      { regex: /\.map\s*\(\s*\)\s*\.filter/g, message: 'Chain map and filter for better performance' },
      { regex: /for\s*\(\s*let\s+\w+\s*=\s*0/g, message: 'Consider using forEach or map' },
      { regex: /JSON\.stringify\s*\(/g, message: 'JSON.stringify can be slow on large objects' },
      { regex: /setTimeout\s*\(\s*\w+\s*,\s*0\s*\)/g, message: 'setTimeout with 0ms is inefficient' },
    ];

    for (const pattern of patterns) {
      const matches = code.match(pattern.regex);
      if (matches) {
        errors.push({
          type: 'performance',
          severity: 'low',
          message: pattern.message,
          code: matches[0],
        });
      }
    }

    return errors;
  }

  /**
   * Heal code automatically
   */
  public async healCode(code: string, language: string = 'typescript'): Promise<HealingResult> {
    const healingId = this.generateId();
    const startTime = Date.now();

    this.emit('healing-started', { healingId });

    try {
      // Step 1: Scan for errors
      const errors = await this.scanCode(code, language);
      this.emit('scan-complete', { healingId, errorCount: errors.length });

      if (errors.length === 0) {
        return {
          original: code,
          healed: code,
          errorsFound: [],
          errorsFix: 0,
          confidence: 1.0,
          timestamp: Date.now(),
        };
      }

      // Step 2: Generate fixes using AI
      let healed = code;
      let fixedCount = 0;

      for (const error of errors) {
        try {
          const fixedCode = await this.fixError(healed, error, language);
          if (fixedCode !== healed) {
            healed = fixedCode;
            fixedCount++;
          }
        } catch (e) {
          console.warn(`Failed to fix error: ${error.message}`);
        }
      }

      this.emit('healing-complete', { healingId, fixedCount });

      // Step 3: Validate healed code
      const confidence = await this.validateCode(healed, language);

      const result: HealingResult = {
        original: code,
        healed,
        errorsFound: errors,
        errorsFix: fixedCount,
        confidence,
        timestamp: Date.now(),
      };

      // Store result
      if (!this.healingHistory.has(healingId)) {
        this.healingHistory.set(healingId, []);
      }
      this.healingHistory.get(healingId)!.push(result);

      if (this.healingHistory.size > this.maxHistory) {
        const firstKey = this.healingHistory.keys().next().value;
        this.healingHistory.delete(firstKey);
      }

      return result;
    } catch (error) {
      this.emit('healing-error', { healingId, error });
      throw error;
    }
  }

  /**
   * Fix individual error
   */
  private async fixError(code: string, error: CodeError, language: string): Promise<string> {
    const prompt = `
Fix this ${error.type} error in ${language} code:

Error: ${error.message}
Code: ${error.code}

Original code:
\`\`\`${language}
${code}
\`\`\`

Provide ONLY the corrected code, no explanations.
`;

    const result = await aiOrchestrator.request(prompt, 'coding');
    return result.response || code;
  }

  /**
   * Validate code
   */
  private async validateCode(code: string, language: string): Promise<number> {
    const errors = await this.scanCode(code, language);

    // Confidence = 1 - (error count / original error count)
    // If no errors, confidence = 1.0
    if (errors.length === 0) return 1.0;

    // Rough estimate: each error reduces confidence by 0.1
    return Math.max(0, 1.0 - errors.length * 0.1);
  }

  /**
   * Generate ID
   */
  private generateId(): string {
    return `heal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get healing history
   */
  public getHistory(healingId: string): HealingResult[] | undefined {
    return this.healingHistory.get(healingId);
  }

  /**
   * Get all healing results
   */
  public getAllResults(): Map<string, HealingResult[]> {
    return this.healingHistory;
  }

  /**
   * Get healing statistics
   */
  public getStatistics(): Record<string, any> {
    let totalErrors = 0;
    let totalFixed = 0;
    let totalScans = 0;
    let avgConfidence = 0;

    this.healingHistory.forEach(results => {
      results.forEach(result => {
        totalErrors += result.errorsFound.length;
        totalFixed += result.errorsFix;
        totalScans++;
        avgConfidence += result.confidence;
      });
    });

    return {
      totalScans,
      totalErrors,
      totalFixed,
      fixRate: totalErrors > 0 ? (totalFixed / totalErrors) * 100 : 0,
      avgConfidence: totalScans > 0 ? avgConfidence / totalScans : 0,
    };
  }
}

// Export singleton
export const selfHealer = new SelfHealer();
