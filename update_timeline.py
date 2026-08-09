import re

html_path = 'index.html'
with open(html_path, 'r') as f:
    content = f.read()

# The timeline div is from <div class="timeline" id="timeline"> to its closing </div>
# But let's just replace the years first.
content = re.sub(r'\s*<span class="timeline-year">.*?</span>', '', content)
content = re.sub(r'\s*<span class="back-year">.*?</span>', '', content)

# Now we need to append the remaining 4 entries before the closing </div> of the timeline
# The last entry currently is data-memory="4". We need to find the closing div of timeline.
# Let's find: `          </div>\n\n        </div>\n      </div>\n    </section>`
# Wait, the structure is:
#           <div class="timeline-entry left" data-memory="4"> ... </div>
#         </div> <!-- timeline -->
#       </div> <!-- scratch-content wait no, memory-content -->

new_entries = """
          <div class="timeline-entry right" data-memory="5">
            <div class="timeline-dot"></div>
            <div class="polaroid" id="polaroid-5" tabindex="0" role="button">
              <div class="polaroid-front">
                <div class="polaroid-photo">
                  <img src="/assets/photos/raw/early_2000-2.jpeg" alt="Memory 6" class="polaroid-img" />
                </div>
                <p class="polaroid-caption">So cute! 🌟</p>
              </div>
              <div class="polaroid-back">
                <p>"Another one for the books."</p>
              </div>
            </div>
          </div>

          <div class="timeline-entry left" data-memory="6">
            <div class="polaroid" id="polaroid-6" tabindex="0" role="button">
              <div class="polaroid-front">
                <div class="polaroid-photo">
                  <img src="/assets/photos/raw/img3.jpeg" alt="Memory 7" class="polaroid-img" />
                </div>
                <p class="polaroid-caption">Good times 😊</p>
              </div>
              <div class="polaroid-back">
                <p>"Forever our best moments."</p>
              </div>
            </div>
            <div class="timeline-dot"></div>
          </div>

          <div class="timeline-entry right" data-memory="7">
            <div class="timeline-dot"></div>
            <div class="polaroid" id="polaroid-7" tabindex="0" role="button">
              <div class="polaroid-front">
                <div class="polaroid-photo">
                  <img src="/assets/photos/raw/20250930_192441.jpg" alt="Memory 8" class="polaroid-img" />
                </div>
                <p class="polaroid-caption">Unforgettable ✨</p>
              </div>
              <div class="polaroid-back">
                <p>"Keep shining bright."</p>
              </div>
            </div>
          </div>

          <div class="timeline-entry left" data-memory="8">
            <div class="polaroid" id="polaroid-8" tabindex="0" role="button">
              <div class="polaroid-front">
                <div class="polaroid-photo">
                  <img src="/assets/photos/raw/20250930_193824.jpg" alt="Memory 9" class="polaroid-img" />
                </div>
                <p class="polaroid-caption">Best sister ❤️</p>
              </div>
              <div class="polaroid-back">
                <p>"Love you to the moon and back."</p>
              </div>
            </div>
            <div class="timeline-dot"></div>
          </div>
"""

# Insert new entries right before `        </div>\n      </div>\n    </section>\n\n    <!-- SECTION 5: SCRATCH ARCADE -->`
pattern = r'(          </div>\n\n)(        </div>\n      </div>\n    </section>\n\n    <!-- SECTION 5: SCRATCH ARCADE -->)'
content = re.sub(pattern, r'\1' + new_entries + r'\2', content)

with open(html_path, 'w') as f:
    f.write(content)
