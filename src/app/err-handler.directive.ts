import { Directive, effect, ErrorHandler, forwardRef, Inject } from '@angular/core';
import { SystemErrorService } from './error-handler.service';




@Directive({
  selector: 'system-error',
  
})
export class ErrHandlerDirective  {

    constructor(@Inject(ErrorHandler) private errHandler:SystemErrorService)
    {
        effect(()=>{
            const err = this.errHandler.err()
            if (err){
              alert("Error"+JSON.stringify(err))
              console.debug(err)

            }
            else{
              console.debug("Init err")
            }

        })
    }
    
}
